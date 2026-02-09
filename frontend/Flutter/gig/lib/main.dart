import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'screens/freelancer/seller/home_screen.dart';
import 'screens/shared/messages_screen.dart';
import 'screens/freelancer/seller/proposals_screen.dart';
import 'screens/shared/profile_screen.dart';
import 'screens/freelancer/buyer/buyer_home_screen.dart';
import 'screens/freelancer/buyer/search_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]).then((_) {
    runApp(const MyApp());
  });
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();

  static _MyAppState? of(BuildContext context) =>
      context.findAncestorStateOfType<_MyAppState>();
}

class _MyAppState extends State<MyApp> {
  ThemeMode _themeMode = ThemeMode.system;

  void changeTheme(ThemeMode themeMode) {
    setState(() {
      _themeMode = themeMode;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gig',
      debugShowCheckedModeBanner: false,
      themeMode: _themeMode,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFFD021),
          primary: const Color(0xFFFFD021),
          surface: Colors.white,
          onSurface: const Color(0xFF111827),
        ),
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          iconTheme: IconThemeData(color: Color(0xFF111827)),
          titleTextStyle: TextStyle(
            color: Color(0xFF111827),
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
          elevation: 0,
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          selectedItemColor: Color(0xFFFFD021),
          unselectedItemColor: Color(0xFF6B7280),
          backgroundColor: Colors.white,
          enableFeedback: true,
          type: BottomNavigationBarType.fixed,
          showSelectedLabels: false,
          showUnselectedLabels: false,
        ),
        splashColor: Colors.transparent,
        highlightColor: Colors.transparent,
      ),
      darkTheme: ThemeData.dark().copyWith(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFFD021),
          primary: const Color(0xFFFFD021),
          brightness: Brightness.dark,
          surface: const Color(0xFF1F2937),
          onSurface: Colors.white,
        ),
        scaffoldBackgroundColor: const Color(0xFF111827),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF1F2937), // Dark surface
          iconTheme: IconThemeData(color: Colors.white),
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
          elevation: 0,
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          selectedItemColor: Color(0xFFFFD021),
          unselectedItemColor: Colors.grey,
          backgroundColor: Color(0xFF1F2937),
          enableFeedback: true,
          type: BottomNavigationBarType.fixed,
          showSelectedLabels: false,
          showUnselectedLabels: false,
        ),
        splashColor: Colors.transparent,
        highlightColor: Colors.transparent,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;
  int _previousIndex = 0;
  bool _isSellerMode = true;

  void _onItemTapped(int index) {
    setState(() {
      _previousIndex = _selectedIndex;
      _selectedIndex = index;
    });
  }

  void _toggleSellerMode(bool value) {
    setState(() {
      _isSellerMode = value;
      // Reset to Home to avoid index out of bounds
      _previousIndex = 0;
      _selectedIndex = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> screens = _isSellerMode
        ? [
            const HomeScreen(),
            const MessagesScreen(),
            const ProposalsScreen(),
            ProfileScreen(
              isSellerMode: _isSellerMode,
              onToggleMode: _toggleSellerMode,
            ),
          ]
        : [
            BuyerHomeScreen(
              onSearchTap: () {
                _onItemTapped(2); // Use _onItemTapped for smooth animation
              },
            ),
            const MessagesScreen(),
            const SearchScreen(),
            const ProposalsScreen(),
            ProfileScreen(
              isSellerMode: _isSellerMode,
              onToggleMode: _toggleSellerMode,
            ),
          ];

    final List<BottomNavigationBarItem> navItems = _isSellerMode
        ? [
            BottomNavigationBarItem(
              icon: Icon(
                _selectedIndex == 0 ? Icons.home : Icons.home_outlined,
              ),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(
                _selectedIndex == 1 ? Icons.mail : Icons.mail_outlined,
              ),
              label: 'Inbox',
            ),
            BottomNavigationBarItem(
              icon: Icon(
                _selectedIndex == 2
                    ? Icons.description
                    : Icons.description_outlined,
              ),
              label: 'Manage Orders',
            ),
            BottomNavigationBarItem(
              icon: Icon(
                _selectedIndex == 3 ? Icons.person : Icons.person_outlined,
              ),
              label: 'Profile',
            ),
          ]
        : [
            BottomNavigationBarItem(
              icon: Icon(
                _selectedIndex == 0 ? Icons.home : Icons.home_outlined,
              ),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(
                _selectedIndex == 1 ? Icons.mail : Icons.mail_outlined,
              ),
              label: 'Inbox',
            ),
            BottomNavigationBarItem(
              icon: Icon(
                _selectedIndex == 2 ? Icons.search : Icons.search_outlined,
              ),
              label: 'Search',
            ),
            BottomNavigationBarItem(
              icon: Icon(
                _selectedIndex == 3
                    ? Icons.description
                    : Icons.description_outlined,
              ),
              label: 'Manage Orders',
            ),
            BottomNavigationBarItem(
              icon: Icon(
                _selectedIndex == 4 ? Icons.person : Icons.person_outlined,
              ),
              label: 'Profile',
            ),
          ];

    return Scaffold(
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 280),
        transitionBuilder: (child, animation) {
          final bool isForward = _selectedIndex >= _previousIndex;
          final beginOffset = Offset(isForward ? 1.0 : -1.0, 0.0);
          final tween = Tween<Offset>(
            begin: beginOffset,
            end: Offset.zero,
          ).chain(
            CurveTween(curve: Curves.easeInOut),
          );

          return FadeTransition(
            opacity: animation,
            child: SlideTransition(
              position: animation.drive(tween),
              child: child,
            ),
          );
        },
        child: KeyedSubtree(
          key: ValueKey('$_isSellerMode-$_selectedIndex'),
          child: screens[_selectedIndex],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: navItems,
        currentIndex: _selectedIndex,
        selectedItemColor: Theme.of(
          context,
        ).bottomNavigationBarTheme.selectedItemColor,
        unselectedItemColor: Theme.of(
          context,
        ).bottomNavigationBarTheme.unselectedItemColor,
        backgroundColor: Theme.of(
          context,
        ).bottomNavigationBarTheme.backgroundColor,
        type: BottomNavigationBarType.fixed,
        onTap: _onItemTapped,
        showUnselectedLabels: false,
        showSelectedLabels: false,
      ),
    );
  }
}
