# te-sidebar

> Sidebar web component

## Install

```
npm i -S te-sidebar
```

## Usage

```
<te-sidebar>Sidebar content</te-sidebar>
```

## Attributes

| Attribute | Type | Description |
|---|---|---|
| visible | `boolean` | Indication if sidebar visible or not. |

## Methods

| Method | Description |
|---|---|
| `show()` | Slide-in sidebar. |
| `hide()` | Slide-out sidebar. |
| `toggle()` | Slide-in/out sidebar. |

## CSS Variables

| Var | Description | Default |
|---|---|---|
| --te-sidebar-overlay-color | `background-color` of the overlay element behind the sidebar, covering the rest of the page. | `rgba(0,0,0,.5)` |
| --te-sidebar-background | `background` value of the sidebar itself. | `white` |
| --te-sidebar-max-width | `max-width` of the sidebar. (`min-width` is set to `320px`) | `360px` |
| --te-sidebar-shadow | `box-shadow` value of the sidebar. | `none` |

## Disclaimer

To fix the background and make it not scrollable this element appends/removes style properties to the body element of the document.

## License

GPL-2.0 © Willi Eßer
