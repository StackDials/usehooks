<img src="./screenshot.jpg" alt="usehooks-ts banner" align="center" />

<br />

<div align="center">
<h1>usehooks</h1>

<div>React hook library, ready to use, written in Typescript.</div>

<br />

<!-- Badges -->

[![License](https://badgen.net/badge/License/MIT/blue)](https://github.com/StackDials/usehooks/blob/main/LICENSE)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/usehooks)
[![npm](https://img.shields.io/npm/v/usehooks)](https://www.npmjs.com/package/usehooks)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<!-- [![All Contributors](https://img.shields.io/badge/all_contributors-88-orange.svg?style=flat-square)](#contributors-) -->
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<br />
  <pre>npm i <a href="https://www.npmjs.com/package/usehooks">usehooks</a></pre>
  <br />

<div align="center">
  <sub>Created by <a href="https://github.com/NguyenHaiNam24082000">Nguyen Hai Nam</a> and maintained with ❤️ by an amazing <a href="#contributors">team of developers</a>.</sub>
</div>

</div>

<br />

## 📖 Summary

<!-- HOOKS:START -->

- TODO

<!-- HOOKS:END -->

## 🤝 How to Contribute

Thanks for wanting to contribute! It's more than welcome 🤗

### Content changes

Most content changes (like fixing a typo) can be made without cloning the repository.
Simply locate the file you wish to change in the GitHub UI,
and click the little edit icon to make your change directly on the GitHub website.

If you need to make any other substantial changes, then follow the project setup steps below.

### Fork to submit a Pull Request (PR)

Before starting, make sure you have the good system dependencies:

- `node@19.x`
- `npm@^8`

**Note**: To easily switch node version, consider Node Version Manager (nvm).

Then fork the repository, clone it and install.

```bash
git clone https://github.com/{your_username}/usehooks.git
cd usehooks-ts
npm install
```

<!-- ### Create or update a new hook -->
<!--
```bash
# This command generates boilerplate for new hooks.
# Skip if updating an existed hook.
npm run plop

# Then develop the hook (aka test:watch)
npm run dev

# Once the hooks is ready
# Launch the documentation website
# Note: to build the website, you have to compile the usehooks-ts lib
# first, which create website content in the `website/generated` folder,
# used by Gatsby to create pages
cd website
npm install
npm run start

# Before commit: exec types-checking, linters and tests
cd ..
npm run test
``` -->

<!-- ### How is structured a hook ?

```bash
📂 ./src
├── 📂 useHookName
│  ├── 📄 useHookName.demo.tsx # working demo
│  ├── 📝 useHookName.mdx # the documentation content
│  ├── 🧪 useHookName.test.ts # unit tests
│  └── 📄 useHookName.ts # the hook
...
``` -->

When the `usehooks` is compiled, only the necessary files are used.
The other files are copied in the documentation website.

**Note**: The demo is used different way:

- It's displayed on the website to illustrate how to use the hook.
- It's deployed as a CodeSandbox on build to let final users play with.

## ✨ Contributors

Big thanks goes to these wonderful people ❤️

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/NguyenHaiNam24082000"><img src="https://avatars.githubusercontent.com/u/59411728?s=96&v=4" width="80px;" alt=""/><br /><sub><b>Nguyen Hai Nam</b></sub></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification ([emoji key](https://allcontributors.org/docs/en/emoji-key)). Contributions of any kind welcome!

## 🚗 Roadmap

- Unit-test all hooks
- Add more hooks

## 📝 License

This project is [MIT](https://github.com/StackDials/usehooks/blob/main/LICENSE) licensed.
