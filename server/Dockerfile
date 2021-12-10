FROM python:3-alpine

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install waitress

COPY . /app

EXPOSE 8080

CMD ["waitress-serve", "--call", "app:create"]