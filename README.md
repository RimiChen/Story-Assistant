# Story-Assistant
-----
Setting Instructions:
================
This tool has three parts:
- visualization web interface
- text processing
- analyze

#####web interface:
Step 1: install node.js.
the installation files can be found in here: https://nodejs.org/en/
Step 2: install http-server to launch a local server, https://www.npmjs.com/package/http-server

```
npm install http-server -g
```
and then launch your local server:
```
http-server <where you put the web interface> -p <port number> -c-1
```

#####text processing
We use nltk package to retrieve information from text.
nltk package only work in python 3 (32 bit)

Step 1:
install python 3, https://www.python.org/

Step 2:
install nltk package, http://www.nltk.org/
For Windows users, to the ease of installing nltk, here is Windows Binaries for Python Extension Packages: http://www.lfd.uci.edu/~gohlke/pythonlibs/
```
pip install <latest nltk wheel file>
```

Step 3:
after the installtion is done.
in python command line >>
```
import nltk
```
```
nltk.download()
```
download all corpora.

#####analyze:
Our tool rensa is using python 2.7 (32 bit). here is the origianl repository: https://github.com/RensaProject/rensapy

Step 1:
install python 2.7,  https://www.python.org/

Step 2:
to execute python 2 and python 3 in a same computer:
```
py -2 <your script which uses rensa API>
```

