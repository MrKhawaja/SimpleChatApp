html = """<div class="d-md-flex flex-row-reverse align-self-end" style="margin-bottom: 8px;border-radius: 5px;margin-top: 16px;background: var(--bs-white);display: flex;max-width: 95%;position: relative;padding-left: 14px;padding-right: 10px;margin-right: 6px;">
                <h5 class="mb-0 mt-1" style="word-wrap: break-word;max-width: 98%;font-size: 1rem;">dddddfddfsdfdfdsdsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</h5>
            </div>"""


output = ""
cache = 0
setting = ""
sett = ""
for i in html:
    if i == " ":
        setting = ""
    else:
        setting += i
    if setting == "style=" or setting == "class=":
        sett = setting
    if i == '"':
        if sett == "style=":
            if cache == 0:
                output += "{{"
                cache = 1
            else:
                output += "}}"
                sett = ""
                cache = 0
        elif sett == "class=":
            if cache == 0:
                output += '{"'
                cache = 1
            else:
                output += '"}'
                sett = ""
                cache = 0
    elif i == ";" and cache == 1:
        output += ','
    else:
        output += i

print(output)
