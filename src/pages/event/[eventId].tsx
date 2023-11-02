import { useParams, useLocation } from 'wouter';
import { FC, ReactNode, useEffect, useState } from 'react';

import { GrooveSyncEvent } from '@/types';
import { Layout, Container, Button } from '@/components';
import { deleteEventById, deleteFile, getEventById, getPreviewImageById } from '@/lib';
import { useAuth } from '@/hooks';

export const Event: FC = (): ReactNode => {
  const {isAdmin} = useAuth();
  const [, navigate] = useLocation();
  const { eventId } = useParams();
  const [event, setEvent] = useState<GrooveSyncEvent>();

  
  const imageUrl = event?.imageFileId && getPreviewImageById(event.imageFileId)

  const image = {
    url: imageUrl as string,
    alt: event?.name,
    height: event?.imageHeight,
    width: event?.imageWidth
  }

  useEffect(() => {
    (async function run() {
      const event = await getEventById(eventId!)
      setEvent(event)
    })()
  }, [eventId])

  const handleClick = async () => {
    if (!event?.$id) return;

    await deleteEventById(event.$id);

    if (event.imageFileId) {
      await deleteFile(event.imageFileId)
    }

    navigate('/')
  }

  return (
    <Layout>
      <Container className='grid gap-12 grid-cols-1 md:grid-cols-2'>
        <div>
          {image?.url && (
            <img
              className='block rounded'
              width={image.width}
              height={image.width}
              src={image.url}
              alt={image.alt}
            />
          )}
        </div>
        <div>
          {event && (
            <>
              <h1 className='text-3xl font-bold mb-6'>
                {event?.name}
              </h1>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Date:</strong> {new Date(event.date!).toLocaleString('en-US', {month: 'long', day: 'numeric'})}
              </p>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Location:</strong> {event.location}
              </p>
              {isAdmin && (
                <p className="mt-6">
                  <Button onClick={handleClick} color="red">Delete Event</Button>
                </p>
              )}
            </>
          )}
        </div>
      </Container>
    </Layout>
  )
}
