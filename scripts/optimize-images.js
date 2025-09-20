#!/usr/bin/env node

/**
 * Скрипт для оптимизации изображений в проекте
 * Конвертирует PNG в WebP и создает адаптивные размеры
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Размеры для адаптивных изображений
const RESPONSIVE_SIZES = [640, 750, 828, 1080, 1200, 1920];

// Качество для разных типов изображений
const QUALITY_SETTINGS = {
  hero: 90,      // Высокое качество для hero изображений
  gallery: 85,   // Хорошее качество для галереи
  avatar: 80,    // Среднее качество для аватаров
  icon: 95,      // Высокое качество для иконок
};

/**
 * Проверяет наличие утилит для конвертации
 */
function checkDependencies() {
  const tools = ['cwebp', 'convert']; // ImageMagick
  
  for (const tool of tools) {
    try {
      execSync(`which ${tool}`, { stdio: 'ignore' });
      console.log(`✅ ${tool} найден`);
    } catch (error) {
      console.log(`❌ ${tool} не найден. Установите: brew install webp imagemagick`);
      return false;
    }
  }
  return true;
}

/**
 * Получает все изображения в директории
 */
function getImages(dir) {
  const images = [];
  const extensions = ['.png', '.jpg', '.jpeg'];
  
  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (extensions.some(ext => item.toLowerCase().endsWith(ext))) {
        const size = stat.size;
        const relativePath = path.relative(PUBLIC_DIR, fullPath);
        images.push({ fullPath, relativePath, size, name: item });
      }
    }
  }
  
  scanDir(dir);
  return images;
}

/**
 * Конвертирует изображение в WebP
 */
function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    const command = `cwebp -q ${quality} "${inputPath}" -o "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error(`Ошибка конвертации ${inputPath}:`, error.message);
    return false;
  }
}

/**
 * Создает адаптивные размеры изображения
 */
function createResponsiveSizes(inputPath, outputDir, baseName, quality = 85) {
  const results = [];
  
  for (const width of RESPONSIVE_SIZES) {
    const outputPath = path.join(outputDir, `${baseName}-${width}w.webp`);
    
    try {
      // Используем ImageMagick для ресайза и конвертации
      const command = `convert "${inputPath}" -resize ${width}x -quality ${quality} "${outputPath}"`;
      execSync(command, { stdio: 'ignore' });
      
      const stat = fs.statSync(outputPath);
      results.push({
        width,
        path: outputPath,
        size: stat.size
      });
    } catch (error) {
      console.error(`Ошибка создания размера ${width}px для ${inputPath}:`, error.message);
    }
  }
  
  return results;
}

/**
 * Определяет тип изображения по пути
 */
function getImageType(imagePath) {
  if (imagePath.includes('/users/')) return 'avatar';
  if (imagePath.includes('/gallery/')) return 'gallery';
  if (imagePath.includes('/logos/')) return 'icon';
  if (imagePath.includes('/hero/')) return 'hero';
  return 'gallery';
}

/**
 * Основная функция оптимизации
 */
function optimizeImages() {
  console.log('🚀 Начинаем оптимизацию изображений...\n');
  
  if (!checkDependencies()) {
    console.log('\n❌ Не все зависимости установлены. Прерываем выполнение.');
    process.exit(1);
  }
  
  const images = getImages(IMAGES_DIR);
  console.log(`📸 Найдено ${images.length} изображений\n`);
  
  let totalSavings = 0;
  let processedCount = 0;
  
  for (const image of images) {
    const imageType = getImageType(image.relativePath);
    const quality = QUALITY_SETTINGS[imageType];
    
    console.log(`🔄 Обрабатываем: ${image.relativePath} (${(image.size / 1024).toFixed(1)} KB)`);
    
    // Создаем WebP версию
    const webpPath = image.fullPath.replace(/\.(png|jpe?g)$/i, '.webp');
    const webpExists = fs.existsSync(webpPath);
    
    if (!webpExists) {
      const success = convertToWebP(image.fullPath, webpPath, quality);
      
      if (success) {
        const webpStat = fs.statSync(webpPath);
        const savings = image.size - webpStat.size;
        totalSavings += savings;
        
        console.log(`  ✅ WebP создан: ${(webpStat.size / 1024).toFixed(1)} KB (экономия: ${(savings / 1024).toFixed(1)} KB)`);
      }
    } else {
      console.log(`  ⏭️  WebP уже существует`);
    }
    
    // Создаем адаптивные размеры для больших изображений
    if (image.size > 100 * 1024 && imageType === 'gallery') { // Больше 100KB
      const dir = path.dirname(image.fullPath);
      const baseName = path.basename(image.fullPath, path.extname(image.fullPath));
      const responsiveDir = path.join(dir, 'responsive');
      
      if (!fs.existsSync(responsiveDir)) {
        fs.mkdirSync(responsiveDir, { recursive: true });
      }
      
      const responsiveSizes = createResponsiveSizes(image.fullPath, responsiveDir, baseName, quality);
      console.log(`  📱 Создано ${responsiveSizes.length} адаптивных размеров`);
    }
    
    processedCount++;
    console.log('');
  }
  
  console.log('🎉 Оптимизация завершена!');
  console.log(`📊 Обработано изображений: ${processedCount}`);
  console.log(`💾 Общая экономия: ${(totalSavings / 1024 / 1024).toFixed(2)} MB`);
  
  // Создаем отчет
  const report = {
    timestamp: new Date().toISOString(),
    processedImages: processedCount,
    totalSavings: totalSavings,
    averageSavings: totalSavings / processedCount
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'optimization-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log(`📄 Отчет сохранен в scripts/optimization-report.json`);
}

// Запускаем если файл вызван напрямую
if (require.main === module) {
  optimizeImages();
}

module.exports = { optimizeImages };
