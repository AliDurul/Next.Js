import Divider from "@/components/Divider"
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { Suspense } from "react";


async function Post() {
  // noStore() // skips cache
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=1');
  const posts = await response.json();

  return <h1>{posts[0].title}</h1>
}

export default async function MainPage() {
  // cookies(); // Headers() noStore()
  return (
    <>
      <Divider title="Caching" />
      <p>{Date.now()}</p>
      <Suspense fallback={<h1>loading...</h1>}>
        <Post />
      </Suspense>
    </>
  );
}
