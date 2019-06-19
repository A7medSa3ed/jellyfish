import numpy
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .scanner.main import (
    image_from_butter,
    detect_answers,
    detect_identity,
)


@csrf_exempt
def index(request):
    if request.method == "POST":
        if request.FILES.get("paper", None) is not None:
            data_temp = request.FILES["paper"].read()

            buffer = numpy.frombuffer(
                data_temp, numpy.uint8
            )
            image = image_from_butter(buffer)

            unprepared_response = detect_answers(image)
            unprepared_response["id"] = detect_identity(image)

            response = JsonResponse(unprepared_response)
            response["Access-Control-Allow-Origin"] = "*"

            return response
        else:
            response = JsonResponse(
                {"error": "No paper file was included"}
            )
            response["Access-Control-Allow-Origin"] = "*"

            return response
