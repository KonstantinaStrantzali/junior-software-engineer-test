import requests
from django.shortcuts import render, redirect, get_object_or_404
from django import forms

def boroughSearcher(request):
    response = requests.get('http://localhost:3000/allboroughs')
    data = response.json()
    boroughs = data["borough"]
    borough_names = [item['borough'] for item in boroughs]
    context = {'boroughs': borough_names}
    return render(request, 'revenueSearcher.html', context)

