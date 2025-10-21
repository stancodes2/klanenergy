import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Klan Energy')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(child: ListTile(title: Text('Order Gas'), onTap: () {})),
          Card(child: ListTile(title: Text('Book Car Wash'), onTap: () {})),
          Card(child: ListTile(title: Text('Wallet & Rewards'), onTap: () {})),
        ],
      ),
    );
  }
}
