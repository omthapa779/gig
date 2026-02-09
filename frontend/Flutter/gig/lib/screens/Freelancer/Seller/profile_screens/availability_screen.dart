import 'package:flutter/material.dart';

class AvailabilityScreen extends StatefulWidget {
  const AvailabilityScreen({super.key});

  @override
  State<AvailabilityScreen> createState() => _AvailabilityScreenState();
}

class _AvailabilityScreenState extends State<AvailabilityScreen> {
  bool _isAvailable = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Availability')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            ListTile(
              title: const Text('Available for work'),
              subtitle: const Text(
                'Turn off to hide your gigs from search results.',
              ),
              trailing: Switch(
                value: _isAvailable,
                onChanged: (value) {
                  setState(() {
                    _isAvailable = value;
                  });
                },
                activeThumbColor: const Color(0xFFFFD021),
              ),
            ),
            if (!_isAvailable) ...[
              const Divider(),
              const ListTile(
                title: Text('Set unavailability period'),
                trailing: Icon(Icons.chevron_right),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
