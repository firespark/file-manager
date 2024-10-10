# File Manager

## Description

This project is a **File Manager** implemented using Node.js. It allows users to perform basic file operations, get system information, compute file hashes, and compress/decompress files via the command line interface (CLI). The application is built using Node.js **Streams API** and does not rely on any external dependencies.

## Features

- **File Operations**: Copy, move, delete, rename files.
- **Directory Navigation**: Change directories, list contents, and prevent navigation above the root directory.
- **System Information**: Retrieve details about the host machine such as CPU info, home directory, and OS architecture.
- **Hash Calculation**: Compute file hashes using Node.js crypto module.
- **Compression/Decompression**: Compress and decompress files using the Brotli algorithm.

## Installation

Ensure that you have Node.js version 22.x.x or higher installed on your system. You can check your Node.js version by running:

```bash
node -v
```

### Steps to install:

1. Clone this repository to your local machine:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3. Install dependencies (if any are required):
    ```bash
    npm install
    ```

## How to Run

To start the application, use the following command:

```bash
npm run start -- --username=your_username
```

Replace `your_username` with your actual username. The program will greet you with a welcome message and provide a CLI prompt for further commands.

## Commands

Below is a list of supported commands:

### Navigation & Working Directory
- Go up one directory level:
    ```bash
    up
    ```
- Change directory:
    ```bash
    cd path_to_directory
    ```
- List contents of the current directory:
    ```bash
    ls
    ```

### File Operations
- Read and print file content:
    ```bash
    cat path_to_file
    ```
- Create a new empty file:
    ```bash
    add new_file_name
    ```
- Rename a file:
    ```bash
    rn path_to_file new_filename
    ```
- Copy a file:
    ```bash
    cp path_to_file path_to_new_directory
    ```
- Move a file:
    ```bash
    mv path_to_file path_to_new_directory
    ```
- Delete a file:
    ```bash
    rm path_to_file
    ```

### Operating System Info
- Get system End-Of-Line (EOL) marker:
    ```bash
    os --EOL
    ```
- Get CPU information:
    ```bash
    os --cpus
    ```
- Get home directory:
    ```bash
    os --homedir
    ```
- Get current system username:
    ```bash
    os --username
    ```
- Get CPU architecture:
    ```bash
    os --architecture
    ```

### Hash Calculation
- Calculate hash for a file:
    ```bash
    hash path_to_file
    ```

### Compression & Decompression
- Compress a file using Brotli algorithm:
    ```bash
    compress path_to_file path_to_destination
    ```
- Decompress a file using Brotli algorithm:
    ```bash
    decompress path_to_file path_to_destination
    ```

## Exiting the Application

To exit the application, you can either:

- Type `.exit` in the command line.
- Press `Ctrl + C`.

Upon exiting, the program will display a goodbye message.
