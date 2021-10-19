// 1. 일단 fetcher를 어떻게 만드는지 한번 볼게요
// 2.보통이었다면 useEffect로 데이터를 fetch 하고 데이터가 fetch 되는동안
// fallback ui를 그려주는식으로 그렸을것.

// 3.하지만 Suspense 안 컴포넌트는 promise(비동기)가 끝날때까지 UI를 렌더링 하지 않는다
// 컴포넌트 자체가 비동기컴포넌트가 되는 느낌

import React, { useState, Suspense } from "react";
import { fetchProfileData } from "../libs/fakeApi";

function getNextId(id) {
  return id === 3 ? 0 : id + 1;
}

const initialResource = fetchProfileData(0);

export default function SuspenseUI() {
  const [resource, setResource] = useState(initialResource);

  return (
    <section>
      <h1>Suspense UI Pattern</h1>
      <button
        onClick={() => {
          const nextUserId = getNextId(resource.userId);
          setResource(fetchProfileData(nextUserId));
        }}
      >
        Next
      </button>
      <ProfilePage resource={resource} />
    </section>
  );
}

function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<h3>loading posts...</h3>}>
      <ProfileTimeline resource={resource} />
    </Suspense>
  );
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  console.log("posts", posts);

  // 기존의 방식이었다면
  //   if (!posts) return <h3>Loaidng...</h3>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
