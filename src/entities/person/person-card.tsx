import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/ui";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";
import { Person } from "./types";

type Props = Pick<Person, "slug" | "name" | "role" | "avatarUrl" | "socials">;

export default function PersonCard({
  slug,
  name,
  role,
  avatarUrl,
  socials,
}: Props) {
  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") || "UA";

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center gap-4 pt-6">
        <Avatar className="size-14">
          {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-base leading-tight">
            <Link href={`/about#${slug}`} className="hover:underline">
              {name}
            </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-2 pt-0">
        {socials?.instagram && (
          <Link
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — Instagram`}
            className="inline-flex size-8 items-center justify-center rounded-md border hover:bg-accent hover:text-accent-foreground"
          >
            <Instagram className="size-4" />
          </Link>
        )}
        {socials?.facebook && (
          <Link
            href={socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — Facebook`}
            className="inline-flex size-8 items-center justify-center rounded-md border hover:bg-accent hover:text-accent-foreground"
          >
            <Facebook className="size-4" />
          </Link>
        )}
        {socials?.linkedin && (
          <Link
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — LinkedIn`}
            className="inline-flex size-8 items-center justify-center rounded-md border hover:bg-accent hover:text-accent-foreground"
          >
            <Linkedin className="size-4" />
          </Link>
        )}
        {socials?.github && (
          <Link
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — GitHub`}
            className="inline-flex size-8 items-center justify-center rounded-md border hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="size-4" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
