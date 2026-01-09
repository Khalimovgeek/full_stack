from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404


from .models import Task
from .serializers import TaskSerializer
from .permissions import IsOwnerOrAmdin

#---------------------------------------------------------------------------------------------------------------

class TaskListCreateAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.userprofile.role == "admin":
            tasks = Task.objects.all()
        else:
            tasks = Task.objects.filter(user=request.user)

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TaskDeleteOrUpdateAPI(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrAmdin]

    def get_object(self, pk):
        return get_object_or_404(Task, pk=pk)

    def get(self, request, pk):
        task = self.get_object(pk)
        self.check_object_permissions(request, task)
        return Response(TaskSerializer(task).data)

    def put(self, request, pk):
        task = self.get_object(pk)
        self.check_object_permissions(request, task)
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        task = self.get_object(pk)
        self.check_object_permissions(request, task)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



