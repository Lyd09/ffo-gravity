
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { LucideProps } from 'lucide-react';

interface Spec {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  label: string;
  value: string;
}

interface WorkstationCardProps {
  title: React.ReactNode;
  description: string;
  specs: Spec[];
  imageUrl?: string;
  dataAiHint?: string;
}

export default function WorkstationCard({ title, description, specs, imageUrl, dataAiHint }: WorkstationCardProps) {
  return (
    <Card className="w-full max-w-lg bg-secondary/30 border-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl && (
          <div className="mb-6 relative aspect-video w-full overflow-hidden rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
            <Image
              src={imageUrl}
              alt={title as string}
              fill
              className="object-cover"
              data-ai-hint={dataAiHint}
            />
          </div>
        )}
        <ul className="space-y-4">
          {specs.map((spec, index) => (
            <React.Fragment key={index}>
              <li className="flex items-start gap-4 text-sm">
                <spec.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{spec.label}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </div>
              </li>
              {index < specs.length - 1 && <hr className="border-border/50" />}
            </React.Fragment>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
