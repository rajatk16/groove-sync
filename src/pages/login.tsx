import { FC, ReactNode, SyntheticEvent, useEffect, useState } from "react";

import { useAuth } from "@/hooks";
import { Button, Container, FormLabel, FormRow, InputText, Layout } from "@/components";
import { Redirect } from "wouter";

export const Login: FC = (): ReactNode => {
  const { session, login } = useAuth();
  const [status, setStatus] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>();

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get('error');

    if (error === 'user_invalid_token') {
      setErrMsg("Your previous login session has expired!")
    }
  }, [])
  
  
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email) return;
    await login(email);

    setStatus(true)
  }

  if (session) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <Layout>
      <Container>
        {errMsg && (
          <div className="flex justify-center items-center">
            <div className="p-5 bg-red-50 text-center rounded min-w-lg">
              <h6>
                Sorry, we couldn't log you in!
              </h6>
              <p>{errMsg}</p>
            </div>
          </div>
        )}
        {!status && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">
              Login
            </h1>
            <form onSubmit={handleSubmit} className="max-w-md border border-slate-200 dark:border-slate-500 rounded p-6 mx-auto">
              <FormRow className="mb-5">
                <FormLabel htmlFor="email">Email</FormLabel>
                <InputText onChange={(e) => setEmail(e.target.value)} value={email} id="email" name="email" type="email" />
              </FormRow>

              <Button color="green">Submit</Button>
            </form>
          </>
        )}

        {status && (
          <div className="flex justify-center items-center">
            <div className="p-5 bg-green-50 text-center rounded min-w-lg">
              <h6>
                Magic URL sent successfully!
              </h6>
              <p>Please check your emai: {email}</p>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  )
}