from rest_framework import permissions


class EventPermissions(permissions.BasePermission):
    """Allow certain users to edit Events"""

    def has_permission(self, request, view):
        """Check if the user if authenticated for the request"""
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated

        # If the user does not have this email tag
        # they can not do anything outside of get
        # or is staff
        if (
            request.user.username == "Rokhsareh@empoweredwomen-mcr.org"
                or request.user.is_staff):
            return True
        else:
            return False
