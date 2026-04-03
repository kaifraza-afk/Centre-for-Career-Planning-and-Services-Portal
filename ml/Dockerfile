FROM python:3.12-slim

WORKDIR /app

COPY ml/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ml/ .

EXPOSE 5001

CMD ["python", "ml_api.py"]