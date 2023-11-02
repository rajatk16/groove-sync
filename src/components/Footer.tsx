import { FC, ReactNode } from "react";

import { Container } from "@/components";

export const Footer: FC = (): ReactNode => (
  <footer className="mt-20">
    <Container className="p-6">
      <p className="text-center text-slate-500">
        Built with <span className="text-red-500">&#10084;</span> by <a target="_blank" href="https://twitter.com/geeky_writer_">@geeky_writer</a>
      </p>
    </Container>
  </footer>
)