import useDB_Connection from "../DB-hook/connection-hook";
const connectToDB = useDB_Connection;

//url, method = "GET", body = null, headers = {}
async function SignUserUp(userEmail, password, firstName, lastName) {
  let requestBody = JSON.stringify({
    userEmail: userEmail,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  const userSignUpCheck = await connectToDB(
    "http://localhost:5000/userAPI/signUp",
    "POST",
    requestBody,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );
  const data = userSignUpCheck;
  console.log("Data from Sign up: ", data);
}

export default SignUserUp;
