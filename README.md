# next-ajax-hook
> Intercepting browser's AJAX requests.

## installation
```bash
npm install -S afeiship/next-ajax-hook --registry=https://registry.npm.taobao.org
```

## apis
| api | params | description      |
| --- | ------ | ---------------- |
| on  | -      | hook something   |
| off | -      | unhook something |

## usage
```js
import NxAjaxHook from 'next-ajax-hook';

NxAjaxHook.on({
  properties: {
    responseXML: 129,
    responseType: 'json'
  },
  events: {
    load: function(event) {
      console.log('xxx', event);
    }
  }
});

// hook jquery
$.ajax({
  url: 'https://api.github.com/users/afeiship',
  method: 'GET',
  success: function(res) {
    console.log('response updated_at:->', res.updated_at);
  }
});
```

## resources
- https://github.com/wendux/Ajax-hook.git
