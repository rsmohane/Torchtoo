# 🔐 GRT Torch Bearer

**Secure Professional Identity Infrastructure Platform**

A comprehensive, enterprise-grade platform for identity verification, trust management, secure communications, and compliance automation.

## 🚀 Features

### Core Modules
- **Identity Processing** - Auto KYC, profile building, duplicate detection
- **Trust Engine** - Automated trust score calculation and management
- **Secure Vault** - Military-grade encryption for sensitive data
- **Secure Email** - End-to-end encrypted email with risk assessment
- **Risk Detection** - AI-powered login risk assessment and geo-fencing
- **Compliance** - Auto audit logs, GDPR handling, policy enforcement
- **Blockchain Anchor** - Immutable record for audit trails
- **API Marketplace** - Secure API management and key generation

## 📦 Tech Stack

- **Backend**: C# .NET Core 7.0 with ASP.NET
- **Frontend**: React.js 18 with TypeScript
- **Mobile**: React Native
- **Database**: MSSQL Server 2022
- **Cache**: Redis
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions

## 🏗️ Project Structure

```
grt-torch-bearer/
├── backend/               # .NET Core API
├── frontend/
│   ├── grt-website/      # Main website
│   ├── grt-admin/        # Admin dashboard
│   └── grt-marketplace/  # Marketplace
├── mobile/               # React Native app
├── kubernetes/           # K8s configs
├── docker-compose.yml    # Local development
└── docs/                 # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- .NET 7.0 SDK
- Node.js 18+
- Docker for Kubernetes

### Local Development

1. Clone the repository
```bash
git clone https://github.com/grtgroup2000-code/grt-torch-bearer.git
cd grt-torch-bearer
```

2. Start services with Docker Compose
```bash
docker-compose up -d
```

3. Run migrations
```bash
cd backend
dotnet ef database update
```

4. Start frontend development
```bash
cd frontend/grt-website
npm install
npm run dev
```

5. Access the application
- Website: http://localhost:3000
- Admin: http://localhost:3001
- API: http://localhost:5000
- API Docs: http://localhost:5000/swagger

## 📚 API Documentation

Full API documentation available at `/swagger` when running the backend.

### Key Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/generate-api-key` - Generate API key

**Identity**
- `POST /api/identity/kyc-verify` - KYC verification
- `GET /api/identity/profile/{userId}` - Get user profile
- `PUT /api/identity/profile` - Update profile
- `POST /api/identity/check-duplicate` - Check duplicate identity

**Trust Engine**
- `GET /api/trust/score/{userId}` - Get trust score
- `POST /api/trust/update` - Update trust score
- `GET /api/trust/trustworthy/{userId}` - Check if trustworthy

**Vault**
- `POST /api/vault/store` - Store secret
- `GET /api/vault/{key}` - Retrieve secret
- `DELETE /api/vault/{key}` - Delete secret
- `GET /api/vault/list` - List secrets

**Email**
- `POST /api/email/send` - Send secure email
- `GET /api/email/{emailId}` - Get email
- `POST /api/email/assess-risk` - Email risk assessment

**Risk Detection**
- `POST /api/risk/assess-login` - Assess login risk
- `GET /api/risk/account-status/{userId}` - Get account security status

## 🐳 Docker Compose

Services included:
- **mssql** - MSSQL Server 2022
- **backend** - API server
- **frontend** - Website (port 3000)
- **admin** - Admin dashboard (port 3001)
- **marketplace** - Marketplace (port 3002)
- **redis** - Cache server

## ☸️ Kubernetes Deployment

Deploy to Kubernetes:
```bash
kubectl apply -f kubernetes/
```

## 🔑 API Key Generation

Example request:
```bash
curl -X POST http://localhost:5000/api/auth/generate-api-key \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

Response:
```json
{
  "success": true,
  "message": "API Key generated successfully",
  "data": {
    "apiKey": "sk_live_abc123...",
    "apiSecret": "sk_secret_xyz789...",
    "createdAt": "2024-02-25T10:30:00Z"
  }
}
```

## 🔒 Security Features

- Zero Trust Architecture
- End-to-end AES-256 encryption
- JWT token-based authentication
- Device fingerprinting
- Geo-fencing
- Rate limiting
- OWASP compliance
- Immutable audit logs
- Blockchain anchoring

## 📋 Configuration

Environment variables (`.env`):
```env
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__DefaultConnection=Server=localhost,1433;Initial Catalog=GrtTorchBearer;User Id=sa;Password=GrtBearer@2024!;
Jwt__Secret=your-super-secret-key-min-32-chars
Encryption__Key=your-encryption-key-min-32-chars
REACT_APP_API_URL=http://localhost:5000
```

## 🧪 Testing

Run backend tests:
```bash
cd backend
dotnet test
```

Run frontend tests:
```bash
cd frontend/grt-website
npm test
```

## 📊 Monitoring & Logs

View logs:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

Kubernetes logs:
```bash
kubectl logs -f deployment/grt-backend
kubectl logs -f deployment/grt-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For support, email support@grt-torch-bearer.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Built with modern technologies
- Follows industry security best practices
- Designed for scale and reliability

---

**Version**: 1.0.0  
**Last Updated**: February 25, 2024