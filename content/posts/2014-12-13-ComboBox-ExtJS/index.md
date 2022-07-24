---
id: checkcombo-in-sencha-extjs
date: 2014-12-13
title: 'Checkcombo in Sencha ExtJS'
template: post
thumbnail: '../../thumbnails/sencha-extjs-logo.png'
slug: checkcombo-in-sencha-extjs
categories: ExtJS
tags:
    - ExtJS
---

![Regular-Expression](../../images/answered.jpg)

ExtJS does not come with multi-check dropdown. So I thought to build one -

## Ext.ux.PerCheckCombo

This plugin will provide checkcombo ( Checkbox as a list in combobox ) which have additional featute of `disableFieldFeature`.

**Features**:

-   Multiselect using checkboxes
-   Can be used in a form
-   Checkbox can be disable/enable using `disableFieldFeature: true`

If `disableFieldFeature = false` then it will work like checkcombo or `disableFieldFeature = true` then it will have checkcombo with perticular checbox disable.

To access `disableFieldFeature` you should have to specify extra `disablefield` in store (shown in below example).

Example:

```javascript
// Store
let test_store = Ext.create('Ext.data.Store', {
    autoLoad: false,
    id: 'test_store_id',
    fields: [
        {
            name: 'id',
            type: 'string',
        },
        {
            name: 'name',
            type: 'string',
        },
        {
            name: 'disablefield',
            type: 'string',
        },
    ],
    proxy: {
        type: 'ajax',
        url: 'test.php',
        reader: {
            type: 'json',
            root: 'rows',
        },
    },
});
```

Usage:

```javascript
{
    xtype: 'persearchcheckcombo',
    name: 'test_name',
    fieldLabel: 'test',
    valueField: 'id',
    displayField: 'name',
    store: test_store,
    disableFieldFeature: true
}
```

## Ext.ux.PerSearchCheckCombo

This plugin will provide checkcombo ( checkbox as a list in combobox ) and search field which have extra feature of `disableFieldFeature`.

**Features**

-   Adds a search field in a checkcombo to allow user to filter the list
-   Can be used in a form
-   Checbox can be disable/enable based on `disableFieldFeature: true`

If `disableFieldFeature = false` then it will work like checkcombo or `disableFieldFeature = true` then it will have checkcombo with perticular checbox disable.

To access `disableFieldFeature` you should have to specify extra `disablefield` in store (shown in example).

Example:

```javascript
// Store
var test_store = Ext.create('Ext.data.Store', {
    autoLoad: false,
    id: 'test_store_id',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'disablefield', type: 'string' },
    ],
    proxy: {
        type: 'ajax',
        url: 'test.php',
        reader: { type: 'json', root: 'rows' },
    },
});
```

Usage

```javascript
{
  xtype: 'persearchcheckcombo',
  name: 'test_name',
  fieldLabel: 'test',
  valueField: 'id',
  displayField: 'name',
  store: test_store,
  disableFieldFeature: true
}
```

## Reference

-   Check this [repo](https://github.com/sanketgandhi/Sencha-ExtJS-Plugins)
-   For More info check [this](https://www.sencha.com/forum/showthread.php?295648-Ext.ux.PerCheckCombo&p=1079358&viewfull=1#post1079358) thread on sencha community forum.

-   Check [this](https://www.sencha.com/forum/showthread.php?296637-Ext.ux.grid.filter.DateTimeFilter&p=1083191#post1083191) Date time filter plugin with lot of features.

Happy Coding! ☺
