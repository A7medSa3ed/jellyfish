# from django.shortcuts import render
import numpy
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .scanner.main import detect_answers

@csrf_exempt
def index(request):
	if request.method == 'POST':
		if request.FILES.get("paper", None) is not None:
			data_temp = request.FILES['paper'].read()

			image = numpy.frombuffer(data_temp, numpy.uint8)

			response = JsonResponse(detect_answers(image))
			response["Access-Control-Allow-Origin"] = "*"

			return response
		else:
			response = JsonResponse({"error": "No paper file was included"})
			response["Access-Control-Allow-Origin"] = "*"

			return response
