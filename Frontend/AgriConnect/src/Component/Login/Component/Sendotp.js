export const myFunction = async (mobileno, userId) => {
    try {
      console.log("Received data from React - Mobile:", mobileno);
      console.log("Received data from React - User ID:", userId);
  
      const response = await fetch(`http://localhost:8080/Forgot_Password?Phone=${mobileno}&UserID=${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      
      const otp = await response.text();
      if (otp.trim() !== "Not_A_User") {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // Updated content type
          body: JSON.stringify({
            token: "o0i02ea0mew4qrch",
            to: mobileno, // Ensure the 'to' field is correctly provided
            body: "Your OTP is " + otp,
          }),
        };
  
        const smsResponse = await fetch("https://api.ultramsg.com/instance78387/messages/chat?token=o0i02ea0mew4qrch", options);
        if (!smsResponse.ok) {
          throw new Error(`Failed to send SMS: ${smsResponse.status} ${smsResponse.statusText}`);
        }
        
        const smsData = await smsResponse.json();
        console.log("SMS response:", smsData);
      } else {
        console.log("OTP is 'Not_a_user'. Skipping sending.");
      }
    } catch (error) {
      console.error("Error in myFunction:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };