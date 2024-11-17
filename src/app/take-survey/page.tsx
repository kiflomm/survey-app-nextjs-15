'use client';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    question: z.string().min(5, {
        message: "Question header must be at least 5 characters long"
    }),
    options: z.array(z.object({
        option: z.string().min(1, {
            message: "Answer cannot be empty"
        })
    }))
});

const TakeSurveyPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyQuestions, setSurveyQuestions] = useState<z.infer<typeof formSchema>[]>([]);
  const [isLoading,setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('/api/get-survey').then(response => {
      setSurveyQuestions(response.data);
      setIsLoading(false)
    });
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: [{ option: "" }, { option: "" }],
    },
  });

  const handleNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      form.reset({ question: "", options: surveyQuestions[currentQuestion + 1]?.options });
    } else {
      // Handle form submission or finish survey
      console.log('Survey completed', form.getValues());
    }
  };

  return (
    isLoading ? <p>Loading survey</p> : <Form {...form}>
    <FormField
      control={form.control}
      name="question"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Question {currentQuestion + 1}</FormLabel>
          <FormControl>
              <RadioGroup value={field.value} onChange={field.onChange}>
              {field && surveyQuestions[currentQuestion]?.options.map((option, index) => (
                <RadioGroupItem key={index} value={option.option}>
                  {option.option}
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button onClick={handleNext}>Next</Button>
  </Form>
  );
}
;
export default TakeSurveyPage;