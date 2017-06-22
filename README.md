## Webpack Messages Loader

1. Loads messages from .po files
2. Gives a special token to each file 
3. Collect messages with associated tokens in output files based on .po filenames
4. Returns token associated with .po file

## Output file example 
### ru.json
```javascript
{
  "token1": { /* messages from dir1/ru.po */ },
  "token2": { /* messages from dir2/ru.po */ },
  "token3": { /* messages from dir3/ru.po */ }
}
```
