from rest_framework.permissions import BasePermission

class IsOwnerOrAmdin(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.userprofile.role == "admin":
            return True
        return obj.user == request.user