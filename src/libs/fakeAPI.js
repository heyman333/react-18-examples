// 구현하는 방법은 자유롭게지만
// 보통의 예제코드는 다음의 컨벤션을 따름

export function fetchProfileData(userId) {
  let postsPromise = fetchPosts(userId);
  return {
    userId,
    posts: wrapPromise(postsPromise),
  };
}

function wrapPromise(promise) {
  // promise
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

// mocking fetch api
export function fetchPosts(userId) {
  console.log("fetch posts for " + userId + "...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("fetched posts for " + userId);
      switch (userId) {
        case 0:
          resolve([
            {
              id: 0,
              text: "I get by with a little help from my friends",
            },
            {
              id: 1,
              text: "I'd like to be under the sea in an octupus's garden",
            },
            {
              id: 2,
              text: "You got that sand all over your feet",
            },
          ]);
          break;
        case 1:
          resolve([
            {
              id: 0,
              text: "Turn off your mind, relax, and float downstream",
            },
            {
              id: 1,
              text: "All things must pass",
            },
            {
              id: 2,
              text: "I look at the world and I notice it's turning",
            },
          ]);
          break;
        case 2:
          resolve([
            {
              id: 0,
              text: "Living is easy with eyes closed",
            },
            {
              id: 1,
              text: "Nothing's gonna change my world",
            },
            {
              id: 2,
              text: "I am the walrus",
            },
          ]);
          break;
        case 3:
          resolve([
            {
              id: 0,
              text: "Woke up, fell out of bed",
            },
            {
              id: 1,
              text: "Here, there, and everywhere",
            },
            {
              id: 2,
              text: "Two of us sending postcards, writing letters",
            },
          ]);
          break;
        default:
          throw Error("Unknown user.");
      }
    }, 2000 * Math.random());
  });
}
