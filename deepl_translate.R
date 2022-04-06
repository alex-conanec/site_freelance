library(httr)
library(magrittr)


auth_key = rjson::fromJSON(file = ".credentials.json")$deepl_api_key

po = readLines("app/translations/en/LC_MESSAGES/messages.po")

msgid_idx = grepl(x = po, pattern = "msgid") %>% which()
msgstr_idx = grepl(x = po, pattern = "msgstr") %>% which()
msgstr_to_trans_idx = grepl(po[msgstr_idx], pattern = "^msgstr \"\"$")


to_translate = lapply(seq_along(msgstr_idx), function(k){
  if (msgstr_to_trans_idx[k]){
    text = po[msgid_idx[k]:(msgstr_idx[k]-1)] %>% 
      paste(collapse = "") %>% 
      gsub(pattern = '\\"|^msgid ', replacement = "")
    if (nchar(text) > 0){
      trad = GET(url = "https://api-free.deepl.com/v2/translate",
                 query = list(
                   auth_key=auth_key,
                   text=text,
                   target_lang="EN"))
      
      list(
        text = text,
        trad = content(trad)$translations[[1]]$text,
        idx_to_replace = msgstr_idx[k]
      )
    }else{
      NULL
    }
  }else{
    NULL
  }
})


to_translate[sapply(to_translate, is.null)] = NULL
cat("Number of sentences translated:", length(to_translate), "\n")

for (elt in to_translate){
  po[elt$idx_to_replace] = paste0('msgstr \"', elt$trad, '\"')
}
writeLines(po, "app/translations/en/LC_MESSAGES/messages.po")
