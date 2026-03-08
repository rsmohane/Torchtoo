FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy all project files
COPY ["GrtTorchBearer.API/GrtTorchBearer.API.csproj", "GrtTorchBearer.API/"]
COPY ["GrtTorchBearer.Core/GrtTorchBearer.Core.csproj", "GrtTorchBearer.Core/"]
COPY ["GrtTorchBearer.Infrastructure/GrtTorchBearer.Infrastructure.csproj", "GrtTorchBearer.Infrastructure/"]

# Restore all dependencies
RUN dotnet restore "GrtTorchBearer.API/GrtTorchBearer.API.csproj"

COPY . .
WORKDIR "/src/GrtTorchBearer.API"
RUN dotnet build "GrtTorchBearer.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GrtTorchBearer.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "GrtTorchBearer.API.dll"]