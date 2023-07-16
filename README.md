# Email-Auto-Reply
A Node.js app that automatically responds to emails during vacations. It uses the Gmail API to check for new emails, sends replies to emails without prior responses, and adds labels to organize the emails. Built with modern JavaScript standards and Google APIs.
# Just run this app and ENJOY YOUR HOLIDAYS!🚀🎉
# Note
You need to download the credentials.json file from the Google Cloud console to run this app. To download the credentials.json file for your project, you'll need to follow these steps:

1. Go to the Google Cloud Console.
2. Select your project or create a new one if needed.
3. In the left navigation menu, click on "APIs & Services" -> "Credentials".
4. On the "Credentials" page, click on the "Create credentials" button and select "Service account".
5. Fill in the required information for the service account, such as name and description.
6. Choose the role for the service account (e.g., Project Owner, Editor, or Gmail API access).
7. Under "Key type", select "JSON" and click on the "Create" button.
The JSON file containing your credentials will be downloaded to your local machine.
Make sure to place the downloaded credentials.json file in the same directory as your Node.js application, or specify the correct file path when authenticating.

![Screenshot 2023-07-16 130843](https://github.com/agni1402/Email-Auto-Reply/assets/115021170/9a1311eb-2a95-4f10-87f6-4226a2a2ab16)

# Description and Areas of Improvement
Detailed Spec: Libraries and Technologies Used

-Express: Express is a fast and minimalist web application framework for Node.js. It is used to create the server and handle the HTTP routes for our application.

-@google-cloud/local-auth: This library provides an easy way to authenticate with the Gmail API using local authentication. It handles the authentication flow and generates the necessary access tokens for accessing Gmail.

-googleapis: The googleapis library is an official JavaScript client library for various Google APIs. We use it specifically for interacting with the Gmail API, making requests to retrieve emails, send replies, and manage labels.

-path: The path module is a built-in Node.js module that provides utilities for working with file and directory paths. We use it to specify the path to the credentials.json file and join the directory path with the file name.

Areas for Code Improvement

-Error Handling: The code could benefit from improved error handling. Currently, error handling is minimal, and error messages are not logged or displayed to the user. It would be ideal to implement proper error handling and provide informative error messages or logs to help identify and troubleshoot any issues.

-Modularization: The code can be further modularized to separate concerns and improve code readability and maintainability. Breaking down the code into smaller functions or modules with clear responsibilities can make it easier to understand and test different parts of the application.

-Unit Testing: The code currently lacks unit tests. Implementing unit tests using a testing framework like Jest or Mocha can help ensure the correctness and reliability of the application. Tests can be written for individual functions and components to cover different scenarios and edge cases.

-Code Documentation: Although the code contains some comments, adding more comprehensive documentation can greatly enhance its readability and understandability. Providing clear explanations of the code's purpose, input parameters, return values, and any dependencies or assumptions can help developers navigate the codebase more easily.

-Optimizing API Requests: Currently, the code periodically checks for new emails at random intervals. To optimize performance, consider implementing more efficient strategies, such as leveraging webhooks or utilizing the Gmail API's push notifications feature, which can provide real-time updates instead of relying on periodic checks.

-Rate Limit Handling: The code does not handle rate limits imposed by the Gmail API. It's important to implement rate limit handling to avoid exceeding API quota limits. This can be done by tracking and managing API call rates, implementing back-off strategies, or handling rate limit errors gracefully.

By addressing these areas of improvement, the code can become more robust, maintainable, and scalable, providing a better user experience and reducing potential issues in the future.

# Working
Sender's Gmail
![Screenshot 2023-07-16 121912](https://github.com/agni1402/Email-Auto-Reply/assets/115021170/33902705-a327-4571-8acc-0553fac9597f)

My Gmail
![Screenshot 2023-07-16 123456](https://github.com/agni1402/Email-Auto-Reply/assets/115021170/7907bb7d-0da1-45eb-97a8-d2808cb19bb8)

