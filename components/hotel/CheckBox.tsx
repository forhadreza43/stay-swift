import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function CheckBox({
   id,
   content,
   checked,
   onCheckedChange,
}: {
   id: string;
   content?: string;
   checked?: boolean;
   onCheckedChange?: (checked: boolean) => void;
}) {
   return (
      <div className="flex items-center gap-3">
         <Checkbox
            id={id}
            checked={!!checked}
            onCheckedChange={(v) => onCheckedChange?.(v === true)}
         />
         <Label htmlFor={id} className="cursor-pointer">
            {content}
         </Label>
      </div>
   );
}
