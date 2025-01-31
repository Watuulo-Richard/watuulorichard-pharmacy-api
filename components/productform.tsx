/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
// import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
import TextInput from "./textinput"
import MultipleImageInput from "./imagesupload"
import { ProductType } from "@/Types/types"
import SubmitButton from "./submitbutton"
import { Loader, Plus } from "lucide-react"
import toast from "react-hot-toast"
import TextArea from "./textarea"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export default function ProductForm() {
    const initialImages = [
        "/image-placeholder.png",
        "/image-placeholder.png",
        "/image-placeholder.png",
        ];
    const [productImages, setProductImages] = useState(initialImages);
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ProductType>()
  async function onSubmit(data:ProductType) {
    data.images = productImages
    data.price = Number(data.price)
    console.log(data)
try {
    setLoading(true)
    const response = await fetch(`${baseUrl}/api/v1/products`, {
        method : "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
    if(response.ok){
      setLoading(false)
        toast.success("created")
        console.log(response)
    }
} catch (error) {
  setLoading(false)
  toast.error("failed")
}
    
  }
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="max-w-md mx-auto mt-10" initial="hidden" animate="visible" variants={formVariants}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div variants={itemVariants}>
            <div className="grid gap-3 pt-3">
                <TextInput
                register={register}
                errors={errors}
                label="Product Name"
                name="name"
                />
            </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="grid gap-3">
            <TextArea
              register={register}
              errors={errors}
              label="Product Description"
              name="description"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
            <div className="grid gap-3 pt-3">
                <TextInput
                register={register}
                errors={errors}
                label="Product Price"
                name="price"
                />
            </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="productImages">Product Images</Label>
          <MultipleImageInput
            title="Product Images"
            imageUrls={productImages}
            setImageUrls={setProductImages}
            endpoint="imageUploader"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SubmitButton title="Submit" loadingTitle="Saving Please Wait..." loading={loading} className="w-full bg-slate-950 hover:bg-slate-700" loaderIcon = {Loader} buttonIcon = {Plus}/>
        </motion.div>
      </form>
    </motion.div>
  )
}

