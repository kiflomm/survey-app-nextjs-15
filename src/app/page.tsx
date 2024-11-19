'use client'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
  <Dialog>
    <DialogTrigger className="rounded-md px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition duration-300">
      Get Started
    </DialogTrigger>
    <DialogContent className="p-6 bg-white rounded-lg shadow-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-center text-gray-800">
          Create or Take a Survey
        </DialogTitle>
        <DialogDescription className="text-red-600 text-center mt-2">
          Please choose an option below
        </DialogDescription>
        <div className="flex justify-center space-x-4 mt-4">
          <Link href={"/take-survey"}>
          <Button variant="default" className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 transition duration-300">
            Take Survey
          </Button>
          </Link>
          <Link href={"/create-survey"}>
          <Button variant="default" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition duration-300">
            Create Survey
          </Button>
          </Link>
          <Link href={"/get-analysis"}>
          <Button variant="default" className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 transition duration-300">
            Get Analysis
          </Button>
          </Link>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</div>
  );
}
