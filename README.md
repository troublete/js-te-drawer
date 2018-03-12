# te-drawer

> Drawer web component

[![Sonar Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=troublete-elements-drawer&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=troublete-elements-drawer)
[![Build Status](https://travis-ci.org/troublete/te-drawer.svg?branch=master)](https://travis-ci.org/troublete/te-drawer)

## Install

```
npm i -S te-drawer
```

## Usage

```
<te-drawer>Drawer content</te-drawer>
```

## Attributes

| Attribute | Type | Description |
|---|---|---|
| visible | `boolean` | Indication if drawer visible or not. |

## Methods

| Method | Description |
|---|---|
| `show()` | Slide-in drawer. |
| `hide()` | Slide-out drawer. |
| `toggle()` | Slide-in/out drawer. |

## CSS Variables

| Var | Description | Default |
|---|---|---|
| --te-drawer-overlay-color | `background-color` of the overlay element behind the drawer, covering the rest of the page. | `rgba(0,0,0,.5)` |
| --te-drawer-background | `background` value of the drawer itself. | `white` |
| --te-drawer-max-width | `max-width` of the drawer. (`min-width` is set to `320px`) | `360px` |
| --te-drawer-shadow | `box-shadow` value of the drawer. | `none` |

## Disclaimer

To fix the background and make it not scrollable this element appends/removes style properties to the body element of the document.

## License

GPL-2.0 © Willi Eßer
