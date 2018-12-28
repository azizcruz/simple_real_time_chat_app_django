from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

# Create your views here.

# Display Main Page.
def index(request):
    context = {
        "title": "ChatApp"
    }
    return render(request, 'index.html', context)

# Handle Entering the Chatroom.
def chatroom(request):
    if request.method != 'POST':
        return HttpResponseRedirect(reverse('index'))
    else:
        context = {
            'title': 'Chat Room',
            'username': request.POST.get('username'),
        }

        return render(request, 'chat.html', context)
