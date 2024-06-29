# Angularv15-gui Template

## 15.1.10
- 11/1/2023 - Final update before migrating to new-Git.
- 11/1/2023 - Minor update to correct margins for mini-sidebar.

## 15.1.9
- 10/30/2023 - Reported by Joe K, "I noticed some misalignment here.
The corner logo is not centered and there is no gap between the nav item and the logo." Solution: Fixed alignment issue in logo.component, sidebar.component and full.compopnent.

## 15.1.8
- 10/25/2023 - Requested by Shengtong J, "I was trying the set the favicon href at "index.html" from the environment file since each application will have different icon, I've try different way but it seems not getting the variable from the environment file. I wonder if there a way to set it during the build time?".  Finding: Envionment.ts file is not the right file to use for that purpose. Solution: Introduced my-prebuild-script.js file.  It allowed developers to further customize the app by copying and replacing files before the build process.
- 10/25/2023 - Added proxy.conf.json file for future implementation of SSO Session Based binding type.

## 15.1.7
- 10/17/2023 - Reported by Shengtong J, "I suddenly getting this error only when I open the starter page, and it looks like the error only appears on the localhost environment".  Finding: The 'Expression has changed after it was checked' error in the starter-grid.component only occurs when the screen is sized smaller.  Solution: Reworked the starter-grid.component.  Removed mat-grid and used only css grid.
- 10/17/2023 - Reworked start-footer.component to work with the dark theme.
- 10/17/2023 - REported by Shengtong J, "The styling issue on these three pages (loading, login, logout) were not consistent which they all located on top of the page where before is all in the center".  Solution: Reworked error-route.component and logout.component.
- 10/17/2023 - Reported by Rexter D, the Hamburger Menu for the topbar needs aria-label attribute as it failed the ADA test using google Lighthouse.  

## 15.1.6
- 10/16/2023 - Reported by Kevin C, "Shengton was running into 'exceeded maximum budget. Budget 4.00 kB was not met by 32.04 kB with a total of 36.04 kB.' when building for prod'. I asked shengton to add that block into prod config and see if that should fix the issue.  Solution: Added "optimization": true and related code block to the angular.json file in the Production configuration.
- 10/16/2023 - Optimized dark theme so the background of the app and the mat-card are different colors.
- 10/16/2023 - Removed unused theme files in the assets/scss/themecolors folder.

## 15.1.5
- 10/12/2023 - Reported by Joe K, "I noticed a strange behavior where the mat-dialog does not have the assigned theme. Taking a look at the screenshot below, you can see that the theme is supposed to be the blueTheme but the dialog has the orangeTheme." Fixed: Rework the theme files in /assets/scss/ folder, added features/_my_theme_color.scss file for defining the theme color, deprecated display.currentTheme attribute in my-config-data.ts file.

## 15.1.4
- 10/05/2023 - Forgot to update version number in package.json, my-config-data.ts.
- 10/05/2023 - Requested by Tina, "Can we make the screen 100% like the screenshot below? AM2 has lots of content and most pages have organization tree on the left panel".  Added "container" attribute to the my-config-data.ts file.  Set display.container="full" to use 100% width of the screen and display.container="boxed" to use 1200px width of the screen.

## 15.1.3
- 10/05/2023 - Requested by Tina, "Can we make the screen 100% like the screenshot below? AM2 has lots of content and most pages have organization tree on the left panel".  Added "container" attribute to the my-config-data.ts file.  Set display.container="full" to use 100% width of the screen and display.container="boxed" to use 1200px width of the screen.

## 15.1.2
- 08/31/2023 - Fixed costmetic issue with countdown-snack-bar component.
- 09/01/2023 - Revised logo.component so that logo icon will be hidden when the screen size is xs (xs=mobile size).
- 09/06/2023 - Added app.logoName attribute in my-config-data.ts.  It will be used in logo component and browser tab.
- 09/06/2023 - Added message bar in the hv-header.component to serve as an indicator for apps running in test mode (int, stg environments).
- 09/06/2023 - Requested by Daniel: "Kristi mentioned having the selected role name be displayed in the profile dropdown under the email as a quality of life update." Added role titles to the dropdown menu.
- 09/06/2023 - Added my-style-data.ts file to serve as a centralized stylesheet that can be applied to the entire app.
- 09/06/2023 - Requested by Tina R.: Fixed the label color of the disabled input field where its default color is too light.  Added a stylesheet in my-style-data.ts to override the default colors.

## 15.1.1
- 08/15/2023 - Added /app/features/my-theme-data.ts

## 15.1.0
- 08/10/2023 - Migrated to MDC-based Angular Material Components.
- 08/10/2023 - Revised vehicle, student examples.
- 08/10/2023 - Revised color theming code.
- 08/10/2023 - Revised navigation sidebar and header code.

## 15.0.2
- 06/26/2023 - Migration release 1.

## 15.0.1
- 06/20/2023 - Updated Dockerfile to use node version 18.16.0 AS builder.


## 15.0.0
- 06/14/2023 - Revised angular.json by adding "apexcharts" to the allowedCommonJsDependencies.  This is to fix the build error after the migration from v13 to v15.
- 06/14/2023 - Revised scss files in /assets/styles/colors folder to fix the build error after the migration from v13 to v15.
- 06/14/2023 - Updated nvm to 1.1.11 and Node.js to 16.18.0.