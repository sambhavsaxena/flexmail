# [Flexmail](https://flexmail.vercel.app)

Flexmail is a disposable temporary email generator, which can be used for wide range of purposes including protection from spammers. `1secmail` servers ~~are~~ were trusted to be one of the fastest servers when it comes to email generators. Hence a fast and customizable frontend was much needed.

**BREAKIN UPDATE**
`1secmail` has officially announced the closure of their services. Hence, the app will no longer support `1secmail`. However, I follow a no strings attached philosophy, and hence for now, it uses another API from Rapid, which still serves the purpose. The app is now live at [Flexmail](https://flexmail.vercel.app).

Moreover, since this is an old project, and Meta has officially announced their discontinuation of Create-react-app, I have migrated the project to Vite.

* **Why this:** Can be used to generate emails instantly, with the name of your choice.
* **Saves a lot of efforts:** Several temporary email generators are very hectic to use as they have high latency.
* ~~**No limit on requests:** Users can fire unlimited number of fetch requests without time boundation.~~
* **Limited use API:** Since the support through 1secmail has been removed, the app now uses a limited use API from RapidAPI.
* **Clean UI:** No longer visit those ad-ridden websites to generate temporary mails.
* ~~**Attachments support:** With this release, users will be able to download attachments from the mails.~~
* **No longer supports attachments:** Again, due to the change in API, the app no longer supports attachments.
* **Low latency requests:** Each request from the client responds with latency `<50ms`.

https://github.com/user-attachments/assets/8e18a52a-15cc-42d2-bf4d-9d31cf8f8c54

## Installation

Follow the steps below to install the app locally: 

* Fork and clone [this](https://github.com/sambhavsaxena/flexmail) repository to create an instant copy of the code.
* Alternatively, you can download the source and set it up with Github Desktop.
* Open the root folder in the code editor you prefer, and run the following commands:

1) cd ./flexmail/ && npm install
2) npm run dev

## Documentation

Check out the [Getting Started](https://vite.dev/guide/) page for a quick overview of the project structure.

You can improve it by sending pull requests to [this repository](https://github.com/sambhavsaxena/flexmail).

## Contributing
The main purpose of this repository is to continue evolving Vite core, making it faster and easier to use. Development of Vite happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Vite.

### Code of Conduct
Flexmail has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### Contributing Guide
Read the Vite's [contributing guide](https://github.com/vitejs/vite/blob/main/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Vite, or overall MERN.

### Good First Issues
To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/sambhavsaxena/flexmail/labels/good%20first%20issue) that contain bugs which have a relatively limited scope. This is a great place to get started <3.

### License
Flexmail is [MIT licensed](./LICENSE).
