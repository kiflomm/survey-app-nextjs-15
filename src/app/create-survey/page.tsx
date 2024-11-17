'use client'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import axios from 'axios'

const formSchema = z.object({
    question: z.string().min(5, {
        message: "Question must be at least 5 characters long"
    }),
    options: z.array(z.object({
        option: z.string().min(1, {
            message: "Option cannot be empty"
        })
    })).min(2, {
        message: "At least two options are required"
    })
})

export default function CreateSurvey() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: "",
            options: [{ option: "" }, { option: "" }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "options",
    })

    function onSubmit(values: z.infer<typeof formSchema>) { 
        axios.post('/api/create-survey', values)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-semibold">Question</FormLabel>
                            <FormControl>
                                <Input placeholder="What is your question?" {...field} className="border-gray-300 rounded-md" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <FormLabel className="text-lg font-semibold">Options</FormLabel>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center space-x-2">
                            <FormField
                                control={form.control}
                                name={`options.${index}.option`}
                                render={({ field: optionField }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder={`Option ${index + 1}`} {...optionField} className="border-gray-300 rounded-md" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                onClick={() => remove(index)}
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 text-white"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={() => append({ option: "" })}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Add Option
                    </Button>
                </div>
                <Button type="submit" className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
                    Submit
                </Button>
            </form>
        </Form>
    )
}
