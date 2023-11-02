import { useLocation, Redirect } from "wouter";
import { FC, FormEvent, ReactNode, SyntheticEvent, useState } from "react";

import { GrooveSyncImage } from "@/types";
import { createEvent, uploadFile } from "@/lib";
import { Button, Container, FormLabel, FormRow, InputDate, InputFile, InputText, Layout } from "@/components";
import { useAuth } from "@/hooks";
import { AppwriteException } from "appwrite";

export const EventNew: FC = (): ReactNode => {
  const { session } = useAuth();
  const [, navigate] = useLocation();
  const [error, setError] = useState<string>();
  const [image, setImage] = useState<GrooveSyncImage>();

  const handleOnFileChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList
    }

    const img = new Image();

    img.onload = () => {
      setImage({
        width: img.width,
        height: img.height,
        file: target.files[0]
      })
    }

    img.src = URL.createObjectURL(target.files[0]);

    console.log(img.src);
  }

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const target = e.target as typeof e.target & {
        name: { value: string },
        location: { value: string },
        date: { value: string },
      }

      let file;

      if (image?.file) {
        file = await uploadFile(image.file);
      }

      const result = await createEvent({
        name: target.name.value,
        location: target.location.value,
        date: new Date(target.date.value).toISOString(),
        imageWidth: image?.width,
        imageHeight: image?.height,
        imageFileId: file?.$id
      })

      navigate(`/event/${result.$id}`) 
    } catch (error: unknown) {
      if (error instanceof AppwriteException) {
        if (error.type === 'user_unauthorized') {
          setError('You are not allowed to create events. Sorry!')
        }
      }
    }
  }

  if (!session) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <Layout>
      <Container className="grid gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-6">
            Create a new Event
          </h1>
        </div>
        <form onSubmit={handleOnSubmit}>
          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Event Name</FormLabel>
            <InputText id='name' name='name' type="text" required />
          </FormRow>
          
          <FormRow className="mb-5">
            <FormLabel htmlFor="date">Event Date</FormLabel>
            <InputDate id='date' name='date' type="datetime-local" required />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="location">Event Location</FormLabel>
            <InputText id="location" name="location" type="text" required />
          </FormRow>
          
          <FormRow className="mb-5">
            <FormLabel htmlFor="image">Cover Image</FormLabel>
            <InputFile id="image" name="image" onChange={handleOnFileChange} />
          </FormRow>

          <Button color="green" >Submit</Button>

          {error && (
            <p className="bg-red-50 p-4 mt-6 rounded">{error}</p>
          )}
        </form>
      </Container>
    </Layout>
  )
}