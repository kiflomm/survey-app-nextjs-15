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
        console.log(values)
        axios.post('/api/create-survey', values)
            .then(response => {
                response.data;
                form.reset(); // Reset the form fields after successful submission
            })
            .catch(error => {
                console.log(error)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 bg-white rounded px-6 py-8 shadow-md">
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="text-2xl font-semibold text-gray-900">What would you like to ask?</FormLabel>
                            <FormControl className="mt-1">
                                <Input placeholder="What is your question?" {...field} className="border-2 border-gray-300 rounded-md px-3 py-2" />
                            </FormControl>
                            <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                    )}
                />
                <div className="space-y-4">
                    <FormLabel className="text-2xl font-semibold text-gray-900">Options</FormLabel>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center space-x-2">
                            <FormField
                                control={form.control}
                                name={`options.${index}.option`}
                                render={({ field: optionField }) => (
                                    <FormItem className="flex flex-col">
                                        <FormControl className="mt-1">
                                            <Input placeholder={`Option ${index + 1}`} {...optionField} className="border-2 border-gray-300 rounded-md px-3 py-2" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                onClick={() => remove(index)}
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={() => append({ option: "" })}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1"
                    >
                        Add Option
                    </Button>
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2">
                    Submit
                </Button>
            </form>
        </Form>
    )
}
