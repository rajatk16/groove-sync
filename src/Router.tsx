import { Route } from 'wouter';

import { Event, EventNew, Home, Login, Session } from '@/pages';

export const Router = () => (
  <>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/session" component={Session} />
    <Route path="/events/new" component={EventNew} />
    <Route path="/event/:eventId" component={Event} />
  </>
)