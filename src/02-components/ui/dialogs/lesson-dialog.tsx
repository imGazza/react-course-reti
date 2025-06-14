import { Label } from "@/02-components/ui/label";
import { Button } from "@/02-components/ui/button";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/02-components/ui/dialog";
import { Input } from "@/02-components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { DialogDescription, } from "@radix-ui/react-dialog";
import { BaseDialogProps } from "@/02-components/utils/interfaces/dialog-base-props";
import { GenerateId } from "@/05-model/base/BaseEntity";
import { Lesson } from "@/05-model/base/Lesson";
import { Popover, PopoverContent, PopoverTrigger } from "@/02-components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/02-components/ui/calendar";
import { cn } from "@/98-lib/utils";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface LessonDialogProps extends BaseDialogProps {
    lesson?: Lesson;
    submit: (lesson: Lesson) => void;
    courseId: string;
}

const LessonDialog = ({ lesson, submit, setOpen, open, courseId }: LessonDialogProps) => {

    const defaultValues = {
        id: lesson ? lesson.id : GenerateId(),
        name: lesson ? lesson.name : "",
        courseId: lesson ? lesson.courseId : courseId,
        lessonDate: lesson ? lesson.lessonDate : "",
    }

    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<Lesson>({
        defaultValues: defaultValues
    });

    useEffect(() => {
        register("lessonDate", { required: true });
        reset(defaultValues);

        return removePointerNoneFromBody();
    }, [open]);

    const selectedDate = watch("lessonDate");

    const onSubmit = (data: Lesson) => {
        submit(data);
        setOpen(false);
    }

    const removePointerNoneFromBody = () => {
        document.body.style.removeProperty('pointer-events');
    }

    return (
        <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
                <DialogTitle>{lesson ? "Modifica" : "Aggiungi"} Lezione</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Compila i campi per {lesson ? "modificare" : "aggiungere"} la lezione.
            </DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6 pt-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name" className="text-right">
                            Nome
                        </Label>
                        <Input {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} id="name" className="col-span-3" />
                        {errors.name && errors.name.type === "required" && <span className="text-xs text-red-400" role="alert">Campo obbligatorio</span>}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description" className="text-right">
                            Data Lezione
                        </Label>
                        <Popover modal={true}>
                            <PopoverTrigger asChild>
                                <Button
                                    aria-invalid={errors.lessonDate? "true" : "false"}
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !selectedDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {selectedDate ? format(selectedDate, "PPP", { locale: it }) : <span>Scegli una data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate ? new Date(selectedDate) : undefined}
                                    onSelect={(date) => {
                                        setValue('lessonDate', date?.toISOString() ?? '', { 
                                            shouldValidate: true 
                                        });
                                    }}
                                    locale={it}
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.lessonDate && errors.lessonDate.type === "required" && <span className="text-xs text-red-400" role="alert">Campo obbligatorio</span>}
                    </div>
                    <div className="grid gap-3">
                        <DialogFooter className="flex flex-col gap-3">
                            <Button type="submit">Conferma</Button>
                        </DialogFooter>
                    </div>
                </div>
            </form>
        </DialogContent>
    )

}
export default LessonDialog;