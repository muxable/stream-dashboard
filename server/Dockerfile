FROM python:3-alpine

RUN apk add --update alpine-sdk linux-headers python3-dev

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install waitress

COPY . /app

COPY ./fbkey.json /app/fbkey.json

EXPOSE 8080

CMD ["waitress-serve", "--call", "app:create"]
