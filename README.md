
# My  Portfolio - Created with Astro

This is my first portfolio, built using the Astro framework and incorporating components from React. Feel free to clone this repository and customize it to your liking.

You can check out the live version of this portfolio [here](https://itssofi.dev/).

Don't forget to give this repository a star ⭐ if you find it helpful.

## Components and Styling

In this portfolio, I've integrated a custom component called "CardTerminal.astro," designed to showcase information in a visually appealing manner. To apply styles to this component, use the provided CSS classes. Here's an example of how to use the "CardTerminal" component:

```astro
---
import CardTerminal from "../layouts/CardTerminal.astro";
---

<CardTerminal>
    <p class="terminal__content terminal__content--p">
        ≥ Happily graduated from the" <a href="https://www.oracle.com/mx/education/oracle-next-education/">'One Oracle Next Education'</a> <span class="terminal__content terminal__content--span">program.</span>
    </p>
    
    <p class="terminal__content terminal__content--p"> ≥ Strong foundation in 
        <span class="terminal__content terminal__content--span">semantic HTML, CSS, SCSS, Javascript, React, Styled Components, SASS, React Router, Axios, and Astro. I also have basic knowledge of MySQL.</span>
    </p>
    <p class="terminal__content terminal__content--color">≥ In addition to my technical skills, I have experience in graphic design and UI design.</p>
    <Button
        href="./docs/Angela_Sofia_Osorio_Cv_2023.pdf"
        text="Download CV"
        target="_blank"
    />
</CardTerminal>
```

These styles are applied using the following CSS classes and variables:

```css
.terminal__content {
    text-align: left;
    font-size: 18px;
    font-weight: 400;
    font-family: var(--fira-code);
    line-height: normal;
}

.terminal__content--p {
    color: rgb(182, 182, 3);
}   
.terminal__content--color {
    color: var(--blue-terminal);
}
.terminal__content--h3 {
    color: var(--pink-terminal);
    font-family: var(--fira-code);
}
.terminal__content--span {
    color: var(--green-terminal);
    font-weight: 500;
    font-family: var(--fira-code);
}
.terminal__link {
    color: var(--pink-terminal);
}
```

These styles, in turn, use the following color variables:

```css
--green-terminal: rgb(0, 255, 102);
--yellow-terminal: rgb(182, 182, 3);
--pink-terminal: rgb(255, 0, 144);
--blue-terminal: aqua;
```

Feel free to explore and modify the styles to match your preferences. The color variables provide a convenient way to maintain a consistent color scheme throughout your portfolio.

## License

This project is licensed under the MIT License. Feel free to use, modify, and share it in accordance with the terms of the license. If you have any questions or need assistance, don't hesitate to reach out.

Happy coding! 🚀
![image](https://github.com/SofiDevO/sofidev-portfolio-astro/assets/102200061/15177113-19c4-4de0-aa90-a4f5a32ef07e)


[Visit my website](https://itssofi.dev/)

![image](https://github.com/SofiDevO/SofiDev-landingpage/assets/102200061/132c1833-def1-47ab-8a8d-13c5c0499257)
![image](https://github.com/SofiDevO/SofiDev-landingpage/assets/102200061/448f27ea-1efc-4608-a439-2e81cae00fc4)

![image](https://github.com/SofiDevO/SofiDev-landingpage/assets/102200061/fcd22a9d-5ff7-4673-a2a6-f51b65e4c213)
![image](https://github.com/SofiDevO/SofiDev-landingpage/assets/102200061/e0ed8666-e6f2-40be-a538-82bd019aa3d0)
