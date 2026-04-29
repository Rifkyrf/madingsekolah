# 📱 FLUTTER APP DEVELOPMENT PROMPT
## KARSIS (Karya Siswa) - Digital Student Portfolio & Magazine System

### 🎯 PROJECT OVERVIEW
Create a Flutter mobile application that replicates the functionality of the existing Laravel web application "KARSIS" - a comprehensive digital student portfolio and magazine management system for SMK Bakti Nusantara 666.

### 🏗️ CORE ARCHITECTURE

**Backend Integration:**
- Create REST API endpoints in Laravel for Flutter consumption
- Implement JWT authentication for mobile sessions
- Use Laravel Sanctum for API token management
- Maintain existing database structure

**Flutter Architecture:**
- Use **Provider** or **Riverpod** for state management
- Implement **Clean Architecture** (Domain, Data, Presentation layers)
- Use **Dio** for HTTP requests with interceptors
- Implement **Hive** or **SharedPreferences** for local storage
- Use **GetIt** for dependency injection

### 🔐 AUTHENTICATION SYSTEM

**Multi-Mode Login:**
```dart
enum LoginMode { nis, email, guest }

class AuthService {
  Future<AuthResult> login({
    required String identifier,
    required String password,
    required LoginMode mode,
  });
}
```

**User Roles:**
- Admin (full access)
- Guru (teacher/moderator)
- Siswa (student/content creator)
- Guest (visitor)
- OSIS (student organization)
- Mading (magazine editor)

**Features:**
- OTP-based password reset via SMS/Email
- Biometric authentication (fingerprint/face)
- Auto-login with secure token storage
- Role-based UI adaptation

### 📱 CORE FEATURES TO IMPLEMENT

#### 1. **Dashboard System**
```dart
// Role-specific dashboards
class DashboardScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, auth, child) {
        switch (auth.user.role) {
          case UserRole.admin:
            return AdminDashboard();
          case UserRole.guru:
            return GuruDashboard();
          case UserRole.siswa:
            return SiswaDashboard();
          case UserRole.osis:
            return OsisDashboard();
          case UserRole.mading:
            return MadingDashboard();
          default:
            return GuestDashboard();
        }
      },
    );
  }
}
```

**Dashboard Components:**
- Statistics cards with animations
- Charts using **fl_chart** package
- Recent activities feed
- Quick action buttons
- Notification badges

#### 2. **Content Management System**

**Work/Content Model:**
```dart
class Work {
  final int id;
  final String title;
  final String description;
  final String filePath;
  final String fileType;
  final ContentType contentType;
  final WorkType type; // karya, mading, opini, prestasi, event
  final WorkStatus status; // draft, published
  final User user;
  final String? thumbnailPath;
  final DateTime createdAt;
  final List<Comment> comments;
  final List<Like> likes;
}

enum WorkType { karya, mading, mingguan, harian, prestasi, opini, event }
enum WorkStatus { draft, published }
enum ContentType { image, video, document, code, audio, archive }
```

**Upload System:**
- Multi-file picker with **file_picker** package
- Image compression using **image** package
- Video thumbnail generation
- Progress indicators for uploads
- Drag & drop interface (tablet)
- Camera integration for direct capture

#### 3. **Advanced File Management**

**Supported File Types:**
```dart
class FileTypeConfig {
  static const Map<String, List<String>> supportedTypes = {
    'image': ['jpg', 'jpeg', 'png', 'gif'],
    'video': ['mp4', 'mov', 'avi', 'mkv'],
    'audio': ['mp3', 'wav', 'aac'],
    'document': ['pdf', 'doc', 'docx', 'ppt', 'xls'],
    'code': ['py', 'js', 'html', 'css', 'php', 'java'],
    'archive': ['zip', 'rar', '7z'],
    'executable': ['exe', 'apk'],
  };
  
  static const int maxFileSize = 500 * 1024 * 1024; // 500MB
}
```

**Features:**
- File preview with **flutter_pdfview**, **video_player**
- Thumbnail generation and caching
- File compression before upload
- Offline file management
- Cloud storage integration (Firebase Storage)

#### 4. **Canva-Style Visual Editor**

**Advanced Mading Editor:**
```dart
class MadingEditor extends StatefulWidget {
  @override
  _MadingEditorState createState() => _MadingEditorState();
}

class _MadingEditorState extends State<MadingEditor> {
  List<DesignElement> elements = [];
  DesignElement? selectedElement;
  
  // Editor features
  void addTextElement() { /* Implementation */ }
  void addImageElement() { /* Implementation */ }
  void addShapeElement() { /* Implementation */ }
  void exportDesign() { /* Implementation */ }
}
```

**Editor Features:**
- Drag & drop elements using **flutter_draggable**
- Multi-touch gestures for resize/rotate
- Layer management system
- Template library
- Color picker and font selector
- Export to PNG/PDF using **pdf** package
- Undo/Redo functionality
- Grid and alignment guides

#### 5. **Social Interaction System**

**Like System:**
```dart
class LikeService {
  Future<void> toggleLike(int workId);
  Stream<int> getLikeCount(int workId);
  Future<bool> isLiked(int workId);
}
```

**Comment System:**
```dart
class CommentWidget extends StatelessWidget {
  final Comment comment;
  final VoidCallback? onReply;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;
}
```

**Features:**
- Real-time like/unlike with animations
- Nested comment threads
- Rich text comments with mentions
- Emoji reactions
- Comment moderation for teachers

#### 6. **OSIS Management System**

**OSIS Features:**
```dart
class OsisManagement {
  // Member management
  Future<List<OsisMember>> getMembers();
  Future<void> addMember(OsisMember member);
  Future<void> updateMember(OsisMember member);
  
  // Event management
  Future<List<OsisEvent>> getEvents();
  Future<void> createEvent(OsisEvent event);
  
  // Calendar integration
  Widget buildEventCalendar();
}
```

**OSIS Dashboard:**
- Member directory with photos
- Event calendar with **table_calendar**
- Activity timeline
- Document management
- Meeting scheduler
- Voting system for decisions

#### 7. **Advanced Search & Filter**

**Search Implementation:**
```dart
class SearchService {
  Future<SearchResult> searchAll(String query);
  Future<List<User>> searchUsers(String query);
  Future<List<Work>> searchWorks({
    String? query,
    WorkType? type,
    WorkStatus? status,
    String? author,
  });
}
```

**Features:**
- Global search with suggestions
- Advanced filters with chips
- Search history
- Voice search integration
- Barcode/QR scanner for quick access

#### 8. **Notification System**

**Push Notifications:**
```dart
class NotificationService {
  Future<void> initializeNotifications();
  Future<void> showLocalNotification(String title, String body);
  Future<void> scheduleNotification(DateTime scheduledDate);
  Stream<NotificationModel> getNotifications();
}
```

**Notification Types:**
- Draft submission alerts
- Work publication notifications
- Comment notifications
- Like notifications
- OSIS event reminders
- System announcements

#### 9. **Offline Capabilities**

**Offline Storage:**
```dart
class OfflineService {
  Future<void> cacheWork(Work work);
  Future<List<Work>> getCachedWorks();
  Future<void> syncWhenOnline();
  bool get isOnline;
}
```

**Features:**
- Offline work viewing
- Draft saving offline
- Auto-sync when online
- Offline notification queue
- Cached image loading

#### 10. **Analytics & Reporting**

**Dashboard Analytics:**
```dart
class AnalyticsService {
  Future<DashboardStats> getDashboardStats();
  Future<List<ChartData>> getWorksByType();
  Future<List<ChartData>> getWorksByStatus();
  Future<void> exportReport(ReportType type);
}
```

**Charts & Visualizations:**
- Pie charts for work distribution
- Line charts for activity trends
- Bar charts for user statistics
- Interactive charts with **fl_chart**
- Export to PDF reports

### 🎨 UI/UX DESIGN SPECIFICATIONS

#### **Design System:**
```dart
class AppTheme {
  static const Color primaryColor = Color(0xFF0D47A1);
  static const Color secondaryColor = Color(0xFF1976D2);
  static const Color accentColor = Color(0xFF2196F3);
  
  static ThemeData lightTheme = ThemeData(
    primarySwatch: Colors.blue,
    visualDensity: VisualDensity.adaptivePlatformDensity,
    // Custom theme configuration
  );
}
```

#### **Responsive Design:**
- Adaptive layouts for phone/tablet
- Bottom navigation for mobile
- Side navigation for tablets
- Floating action buttons
- Pull-to-refresh functionality
- Infinite scroll for content lists

#### **Animations:**
```dart
class AppAnimations {
  static const Duration defaultDuration = Duration(milliseconds: 300);
  
  static Widget slideTransition(Widget child) {
    return SlideTransition(/* implementation */);
  }
  
  static Widget fadeTransition(Widget child) {
    return FadeTransition(/* implementation */);
  }
}
```

### 📊 STATE MANAGEMENT ARCHITECTURE

**Provider Structure:**
```dart
// Authentication
class AuthProvider extends ChangeNotifier {
  User? _user;
  bool _isLoading = false;
  
  Future<void> login(String identifier, String password, LoginMode mode);
  Future<void> logout();
  Future<void> refreshToken();
}

// Works Management
class WorksProvider extends ChangeNotifier {
  List<Work> _works = [];
  bool _isLoading = false;
  
  Future<void> fetchWorks();
  Future<void> uploadWork(Work work);
  Future<void> updateWork(Work work);
  Future<void> deleteWork(int id);
}

// OSIS Management
class OsisProvider extends ChangeNotifier {
  List<OsisMember> _members = [];
  List<OsisEvent> _events = [];
  
  Future<void> fetchMembers();
  Future<void> fetchEvents();
  Future<void> createEvent(OsisEvent event);
}
```

### 🔧 TECHNICAL REQUIREMENTS

#### **Dependencies:**
```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.0.5
  
  # HTTP & API
  dio: ^5.3.2
  retrofit: ^4.0.3
  
  # Local Storage
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  shared_preferences: ^2.2.2
  
  # UI Components
  flutter_staggered_grid_view: ^0.7.0
  cached_network_image: ^3.3.0
  photo_view: ^0.14.0
  
  # File Handling
  file_picker: ^6.1.1
  image_picker: ^1.0.4
  image: ^4.1.3
  
  # Media Players
  video_player: ^2.8.1
  flutter_pdfview: ^1.3.2
  
  # Charts & Visualization
  fl_chart: ^0.65.0
  
  # Calendar
  table_calendar: ^3.0.9
  
  # Notifications
  flutter_local_notifications: ^16.3.0
  firebase_messaging: ^14.7.6
  
  # Utils
  intl: ^0.19.0
  url_launcher: ^6.2.1
  share_plus: ^7.2.1
```

#### **Project Structure:**
```
lib/
├── core/
│   ├── constants/
│   ├── errors/
│   ├── network/
│   └── utils/
├── data/
│   ├── datasources/
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── presentation/
│   ├── pages/
│   ├── providers/
│   ├── widgets/
│   └── themes/
└── main.dart
```

### 🚀 IMPLEMENTATION PHASES

#### **Phase 1: Core Foundation (Week 1-2)**
- Authentication system
- Basic navigation
- API integration
- Local storage setup

#### **Phase 2: Content Management (Week 3-4)**
- Work upload/display
- File handling
- Basic CRUD operations
- User profiles

#### **Phase 3: Social Features (Week 5-6)**
- Like/comment system
- Notifications
- Search functionality
- User interactions

#### **Phase 4: Advanced Features (Week 7-8)**
- OSIS management
- Mading editor
- Analytics dashboard
- Offline capabilities

#### **Phase 5: Polish & Testing (Week 9-10)**
- UI/UX refinements
- Performance optimization
- Testing & bug fixes
- App store preparation

### 📱 PLATFORM-SPECIFIC FEATURES

#### **Android:**
- Material Design 3 components
- Android-specific file handling
- Background sync with WorkManager
- Android Auto integration (future)

#### **iOS:**
- Cupertino design elements
- iOS-specific file sharing
- Background app refresh
- Siri shortcuts integration

### 🔒 SECURITY CONSIDERATIONS

- JWT token management with refresh
- Biometric authentication
- Certificate pinning for API calls
- Data encryption for sensitive information
- Secure file storage
- Input validation and sanitization

### 📈 PERFORMANCE OPTIMIZATION

- Image caching and compression
- Lazy loading for large lists
- Database query optimization
- Memory management
- Network request optimization
- App size optimization

### 🧪 TESTING STRATEGY

- Unit tests for business logic
- Widget tests for UI components
- Integration tests for user flows
- API testing with mock servers
- Performance testing
- Accessibility testing

### 🎯 EXISTING LARAVEL FEATURES TO REPLICATE

#### **User Management:**
- Multi-role authentication (Admin, Guru, Siswa, Guest, OSIS, Mading)
- Profile management with photo upload
- NIS-based login for students
- Email-based login for teachers/admin
- Guest access mode

#### **Content Types:**
- Karya Siswa (Student Works)
- Mading Digital (Digital Magazine)
- Mingguan (Weekly Content)
- Harian (Daily Content)
- Prestasi (Achievements)
- Opini (Opinions)
- Event (Events)

#### **File Support:**
- Images: JPG, PNG, GIF (max 500MB)
- Videos: MP4, MOV, AVI, MKV
- Documents: PDF, DOC, DOCX, PPT, XLS
- Code: PY, JS, HTML, CSS, PHP, JAVA
- Archives: ZIP, RAR
- Executables: EXE, APK

#### **Workflow System:**
- Draft → Review → Published workflow
- Moderation system for teachers/admin
- Email notifications for status changes
- Real-time database notifications

#### **Social Features:**
- Like/Unlike system
- Comment system with CRUD operations
- User profiles with content statistics
- Search functionality (users, content)

#### **OSIS Management:**
- Member directory with roles
- Event management
- Calendar integration
- Public OSIS page

#### **Analytics Dashboard:**
- Content statistics by type/status
- User activity metrics
- Charts and visualizations
- Export to Excel/PDF

#### **Advanced Features:**
- OTP-based password reset
- Canva-style visual editor for mading
- Responsive design
- File thumbnail generation
- Notification system

---

**This comprehensive guide provides everything needed to create a Flutter version of the KARSIS Laravel application, maintaining all existing functionality while adding mobile-specific enhancements.**