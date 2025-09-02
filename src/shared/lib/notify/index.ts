import "server-only";
import type { NotifyPayload } from "./types";
import { makeChannels } from "./channels";

let channels = makeChannels();

/** Позволяет переинициализировать (например, в тестах) */
export const reloadNotifyChannels = () => {
  channels = makeChannels();
};

export async function sendNotify(payload: NotifyPayload) {
  const errs: Error[] = [];
  for (const ch of channels) {
    try {
      await ch!.send(payload);
    } catch (e) {
      errs.push(e as Error);
    }
  }
  if (errs.length) {
    // бросаем первую, но логируем все — логгер добавим в секции C
    const err = new Error(
      `Notify errors: ` + errs.map((e) => e.message).join(" | ")
    );
    throw err;
  }
}
