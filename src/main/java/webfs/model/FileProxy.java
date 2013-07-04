package webfs.model;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class FileProxy {
	private File file;
	private String description;
	
	public FileProxy(File file) {
		this.file = file;
	}
	
	public FileProxy(File file, String description) {
		this.file = file;
		this.description = description;
	}

	public String getDescription() {
		return description;
	}
	
	public String getName() {
		return file.getName();
	}
	
	public boolean isDirectory() {
		return file.isDirectory();
	}
	
	public long getSize() {
		return file.length();
	}
	
}
