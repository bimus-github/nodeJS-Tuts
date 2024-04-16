const helloWorld = () => {
  console.log("Hello World!");
};

helloWorld();

fetch("http://localhost:3500/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: "firstName=John&lastName=Doe",
});
