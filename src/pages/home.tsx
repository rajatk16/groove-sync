import { Link } from "wouter";
import { FC, ReactNode, useEffect, useState } from "react";

import { useAuth } from '@/hooks';
import { GrooveSyncEvent } from "@/types";
import { getEvents, getPreviewImageById } from '@/lib/appwrite';
import { Button, Container, EventCard, Layout } from "@/components";

export const Home: FC = (): ReactNode => {
  const { session } = useAuth();
  const [events, setEvents] = useState<GrooveSyncEvent[]>([]);

  useEffect(() => {
    (async function run() {
      const result = await getEvents();
      setEvents(result.events)
    })()
  }, [])

  return (
    <Layout>
      {Array.isArray(events) && events.length > 0 && (
        <>
          <Container className="flex justify-between items-center mb-10">
            <h1 className="text-lg font-bold uppercase text-slate-600 dark:text-slate-200">
              Upcoming Events
            </h1>
            {session && (
              <p>
                <Link href="/events/new">
                  <Button color="green">
                    Add New Event
                  </Button>
                </Link>
              </p>
            )}
          </Container>

          <Container>
            <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const imageUrl = event.imageFileId && getPreviewImageById(event.imageFileId)
                console.log("ImageURL", imageUrl);
                const image = {
                  url: imageUrl,
                  alt: event?.name,
                  height: event.imageHeight as number,
                  width: event?.imageWidth as number
                }
                return (
                  <Link key={event.name} href={`/event/${event.$id}`}>
                    <a>
                      <EventCard
                        date={event.date}
                        image={{
                          alt: image.alt,
                          height: image.height,
                          url: image.url as string,
                          width: image.width
                        }}
                        location={event.location}
                        name={event.name}
                      />
                    </a>
                  </Link>
                )
              })}
            </div>
          </Container>
        </>
      )}
      {Array.isArray(events) && events.length === 0 && (
        <Container>
          <p className="w-100 text-center mb-5">
            No events found.
          </p>
          {session && (
            <p className="w-100 text-center">
              <Link href="/events/new">
                <a>
                  Add an Event
                </a>
              </Link>
            </p>
          )}
        </Container>
      )}
    </Layout>
  )
}